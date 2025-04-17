import React, { useState, useEffect } from 'react';
import {
  Card,
  Descriptions,
  Button,
  message,
  Input,
  DatePicker,
  Form,
  Avatar,
  Upload,
} from 'antd';
import { useSelector } from 'react-redux';
import { updateUserProfile } from '../store/action/userAction';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import api from '../config/axios';
import staticMethods from 'antd/es/message';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const userDetail = useSelector((state) => state.userProfile.profile)
  console.log(userDetail);

  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    location: Yup.string().required('Location is required'),
    bio: Yup.string().required('Bio is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        userId: user.id,
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth?.toISOString() || '',
        bio: values.bio,
        location: values.location,
        profileImage: profileImage?.url || '',
      };

      const response = await updateUserProfile(payload);

      if (response?.success) {
        message.success('Profile updated successfully');
      } else {
        throw new Error(response?.message || 'Failed to update profile');
      }
    } catch (error) {
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async ({ file, fileList }) => {
    if (file && file.type.startsWith('image/')) {
      setFileList([file]);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'nguyen');
        formData.append('cloud_name', 'drzrib7ut');

        const response = await axios.post('https://api.cloudinary.com/v1_1/drzrib7ut/image/upload', formData);

        if (response.data.secure_url) {
          setProfileImage({ url: response.data.secure_url });
        } else {
          message.error('Failed to upload image');
        }
      } catch (error) {
        message.error('Failed to upload image to Cloudinary');
      }
    } else {
      message.error('Please upload a valid image.');
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setFileList([]);
  };

  const previewImageUrl = profileImage
    ? profileImage.url
    : user?.details?.profileImage || user?.profileImage || '/default-avatar.png';

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', color: 'white' }}>
      <h2 style={{ color: 'white' }}>Update Your Profile</h2>

      <Avatar
        src={previewImageUrl}
        size={100}
        style={{ marginBottom: 20, border: '1px solid #ddd' }}
      />

      <Formik
        initialValues={{
          fullName: user.fullName,
          dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth) : null,
          location: user.location,
          bio: user.bio,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Full Name</span>}
              name="fullName"
              validateStatus={errors.fullName && touched.fullName ? 'error' : ''}
              help={errors.fullName && touched.fullName ? errors.fullName : ''}
            >
              <Input
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ color: 'white', backgroundColor: '#333' }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: 'white' }}>Date of Birth</span>}
              name="dateOfBirth"
              validateStatus={errors.dateOfBirth && touched.dateOfBirth ? 'error' : ''}
              help={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
            >
              <DatePicker
                value={values.dateOfBirth}
                onChange={(date) => handleChange({ target: { name: 'dateOfBirth', value: date } })}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: 'white' }}>Location</span>}
              name="location"
              validateStatus={errors.location && touched.location ? 'error' : ''}
              help={errors.location && touched.location ? errors.location : ''}
            >
              <Input
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ color: 'white', backgroundColor: '#333' }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: 'white' }}>Bio</span>}
              name="bio"
              validateStatus={errors.bio && touched.bio ? 'error' : ''}
              help={errors.bio && touched.bio ? errors.bio : ''}
            >
              <Input.TextArea
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                style={{ color: 'white', backgroundColor: '#333' }}
              />
            </Form.Item>

            <Form.Item label={<span style={{ color: 'white' }}>Profile Image</span>}>
              <Upload
                beforeUpload={() => false}
                showUploadList={true}
                accept="image/*"
                onChange={handleImageChange}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
              </Upload>
              {profileImage && (
                <Button type="link" onClick={handleRemoveImage} style={{ marginTop: 10 }}>
                  Remove Image
                </Button>
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: '100%' }}
                disabled={loading}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
