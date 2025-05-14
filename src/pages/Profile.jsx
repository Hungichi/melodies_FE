
import { useState, useEffect } from "react"
import { Card, Button, message, Input, DatePicker, Form, Avatar, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import moment from "moment"
import axios from "axios"
import * as Yup from "yup"
import { Formik } from "formik"
import { fetchCurrentUserProfile, updateUserProfile } from "../store/action/userAction"



const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(null)
    const [fileList, setFileList] = useState([])
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const res = await fetchCurrentUserProfile()
                setUser(res)
            } catch (error) {
                console.error("Error fetching user details:", error)
                messageApi.error("Failed to load profile data")
            }
        }

        fetchUserDetail()
    }, [messageApi])

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full name is required"),
        dateOfBirth: Yup.date().required("Date of birth is required"),
        location: Yup.string().required("Location is required"),
        bio: Yup.string().required("Bio is required"),
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const payload = {
                userId: user.id,
                fullName: values.fullName,
                dateOfBirth: values.dateOfBirth?.toISOString() || "",
                bio: values.bio,
                location: values.location,
                profileImage: profileImage?.url || "",
            }

            const response = await updateUserProfile(payload)

            if (response?.userDetails) {
                messageApi.success(response?.message || "Profile updated successfully")
            } else {
                throw new Error(response?.message || "Failed to update profile")
            }
        } catch (error) {
            messageApi.error(error.message || "Failed to update profile")
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = async ({ file }) => {
        if (file && file.type.startsWith("image/")) {
            setFileList([file])
            try {
                const formData = new FormData()
                formData.append("file", file)
                formData.append("upload_preset", "nguyen")
                formData.append("cloud_name", "drzrib7ut")

                const response = await axios.post("https://api.cloudinary.com/v1_1/drzrib7ut/image/upload", formData)

                if (response.data.secure_url) {
                    setProfileImage({ url: response.data.secure_url })
                    messageApi.success("Image uploaded successfully")
                } else {
                    messageApi.error("Failed to upload image")
                }
            } catch (error) {
                messageApi.error("Failed to upload image to Cloudinary")
            }
        } else {
            messageApi.error("Please upload a valid image.")
        }
    }

    const handleRemoveImage = () => {
        setProfileImage(null)
        setFileList([])
    }

    const previewImageUrl = profileImage
        ? profileImage.url
        : user?.profileImage || "/placeholder.svg?height=100&width=100"

    if (!user) {
        return <div className="flex justify-center items-center min-h-[60vh] text-white">Loading...</div>
    }

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            {contextHolder}
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-white">Update Your Profile</h2>

                <div className="flex flex-col items-center mb-6">
                    <Avatar src={previewImageUrl} size={100} className="mb-4 border border-gray-600" />
                </div>

                <Formik
                    initialValues={{
                        fullName: user?.fullName || "",
                        dateOfBirth: user?.dateOfBirth ? moment(user?.dateOfBirth) : null,
                        location: user?.location || "",
                        bio: user?.bio || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <Form layout="vertical" onFinish={handleSubmit} className="w-full">
                            <Form.Item
                                label={<span className="text-white">Full Name</span>}
                                validateStatus={errors.fullName && touched.fullName ? "error" : ""}
                                help={errors.fullName && touched.fullName ? errors.fullName : ""}
                                className="mb-4"
                            >
                                <Input
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="bg-gray-700 text-white border-gray-600"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-white">Date of Birth</span>}
                                validateStatus={errors.dateOfBirth && touched.dateOfBirth ? "error" : ""}
                                help={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ""}
                                className="mb-4"
                            >
                                <DatePicker
                                    name="dateOfBirth"
                                    value={values.dateOfBirth}
                                    onChange={(date) => setFieldValue("dateOfBirth", date)}
                                    format="YYYY-MM-DD"
                                    className="w-full bg-gray-700 text-white border-gray-600"
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-white">Location</span>}
                                validateStatus={errors.location && touched.location ? "error" : ""}
                                help={errors.location && touched.location ? errors.location : ""}
                                className="mb-4"
                            >
                                <Input
                                    name="location"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="bg-gray-700 text-white border-gray-600"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-white">Bio</span>}
                                validateStatus={errors.bio && touched.bio ? "error" : ""}
                                help={errors.bio && touched.bio ? errors.bio : ""}
                                className="mb-4"
                            >
                                <Input.TextArea
                                    name="bio"
                                    value={values.bio}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={4}
                                    className="bg-gray-700 text-white border-gray-600 resize-none"
                                />
                            </Form.Item>

                            <Form.Item label={<span className="text-white">Profile Image</span>} className="mb-6">
                                <Upload
                                    beforeUpload={() => false}
                                    showUploadList={true}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    fileList={fileList}
                                    className="upload-list-inline"
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        className="bg-blue-500 hover:bg-blue-600 border-blue-600 text-white"
                                    >
                                        Upload Profile Image
                                    </Button>
                                </Upload>
                                {profileImage && (
                                    <Button type="link" onClick={handleRemoveImage} className="mt-2 text-red-400 hover:text-red-300">
                                        Remove Image
                                    </Button>
                                )}
                            </Form.Item>

                            <Form.Item className="mb-0">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="w-full bg-blue-500 hover:bg-blue-600 border-blue-600"
                                    disabled={loading}
                                >
                                    Update Profile
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

export default Profile
