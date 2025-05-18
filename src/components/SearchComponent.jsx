'use client';

import { useState, useRef, useEffect } from 'react';
import { Input, Button, Dropdown, Space, Tag, Spin } from 'antd';
import {
    SearchOutlined,
    CloseCircleFilled,
    HistoryOutlined,
    FireFilled,
    UserOutlined,
    PictureOutlined,
} from '@ant-design/icons';

const SearchComponent = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([
        'Abstract art',
        'Digital paintings',
        'Portrait artists',
    ]);
    const [trendingSearches] = useState([
        'Watercolor landscapes',
        'Modern sculptures',
        'NFT collections',
    ]);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (value) => {
        if (!value.trim()) return;

        setIsLoading(true);

        setTimeout(() => {
            onSearch(value);
            setIsLoading(false);
            setIsExpanded(false);

            if (!recentSearches.includes(value)) {
                setRecentSearches((prev) => [value, ...prev].slice(0, 5));
            }
        }, 500);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchValue.trim()) {
            handleSearch(searchValue);
        }
    };

    const handleTagClick = (value) => {
        setSearchValue(value);
        handleSearch(value);
    };

    const handleRemoveRecent = (e, search) => {
        e.stopPropagation();
        setRecentSearches(recentSearches.filter((item) => item !== search));
    };

    const dropdownContent = (
        <div className="bg-[#231829] shadow-lg border border-[#e835c230] p-4 w-90 max-h-96 overflow-auto rounded-[5px]">
            {searchValue && (
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <SearchOutlined className="text-[#e835c2] mr-2" />
                        <span className="text-white text-sm">Search for</span>
                    </div>
                    <Button
                        type="text"
                        className="w-full text-left text-white hover:bg-[#e835c220] rounded-[5px] py-2"
                        onClick={() => handleSearch(searchValue)}
                    >
                        {searchValue}
                    </Button>
                </div>
            )}

            {recentSearches.length > 0 && (
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <HistoryOutlined className="text-[#e835c2] mr-2" />
                            <span className="text-white text-sm">
                                Recent searches
                            </span>
                        </div>
                        <Button
                            type="text"
                            size="small"
                            className="text-[#e835c2] hover:text-[#ff69b4] hover:bg-transparent"
                            onClick={() => setRecentSearches([])}
                        >
                            Clear all
                        </Button>
                    </div>
                    <Space direction="vertical" className="w-full">
                        {recentSearches.map((search, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between w-full px-2 py-1 hover:bg-[#e835c220] rounded-[5px] cursor-pointer"
                                onClick={() => handleTagClick(search)}
                            >
                                <div className="flex items-center">
                                    <HistoryOutlined className="text-gray-400 mr-2" />
                                    <span className="text-white">{search}</span>
                                </div>
                                <CloseCircleFilled
                                    className="text-gray-400 hover:text-white"
                                    onClick={(e) =>
                                        handleRemoveRecent(e, search)
                                    }
                                />
                            </div>
                        ))}
                    </Space>
                </div>
            )}

            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <FireFilled className="text-[#e835c2] mr-2" />
                    <span className="text-white text-sm">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, index) => (
                        <Tag
                            key={index}
                            className="bg-[#e835c220] text-white border-[#e835c250] cursor-pointer hover:bg-[#e835c240] px-3 py-1 rounded-[5px]"
                            onClick={() => handleTagClick(search)}
                        >
                            {search}
                        </Tag>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center mb-2">
                    <span className="text-white text-sm">
                        Search by category
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="text"
                        icon={<UserOutlined />}
                        className="flex items-center justify-start text-white hover:bg-[#e835c220] rounded-[5px]"
                        onClick={() => handleTagClick('Artists')}
                    >
                        Artists
                    </Button>
                    <Button
                        type="text"
                        icon={<PictureOutlined />}
                        className="flex items-center justify-start text-white hover:bg-[#e835c220] rounded-[5px]"
                        onClick={() => handleTagClick('Artworks')}
                    >
                        Artworks
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div ref={searchRef} className="relative">
            <div
                className={`flex items-center pr-[10px] bg-[#2c1e36] rounded-[10px] transition-all duration-300 border ${
                    isExpanded
                        ? 'border-[#e835c2] shadow-[0_0_10px_rgba(232,53,194,0.3)]'
                        : 'border-[#e835c250]'
                }`}
            >
                <Button
                    type="text"
                    icon={<SearchOutlined style={{ color: '#e835c2' }} />}
                    className="flex items-center justify-center h-10 w-10 ml-1"
                    onClick={() => setIsExpanded(true)}
                />

                <Input
                    placeholder="Search artists, artworks..."
                    value={searchValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsExpanded(true)}
                    onKeyDown={handleKeyDown}
                    variant="borderless"
                    className="bg-transparent text-white w-full"
                    style={{
                        width: isExpanded ? 240 : 180,
                        transition: 'width 0.3s ease',
                    }}
                />

                {searchValue && (
                    <Button
                        type="text"
                        icon={
                            <CloseCircleFilled
                                style={{ color: 'rgba(255,255,255,0.6)' }}
                            />
                        }
                        className="flex items-center justify-center h-8 w-8 rounded-[5px] hover:text-white"
                        onClick={handleClear}
                    />
                )}
            </div>

            {isExpanded && (
                <Dropdown
                    open={true}
                    overlay={dropdownContent}
                    placement="bottomLeft"
                    getPopupContainer={() => searchRef.current}
                >
                    <div></div>
                </Dropdown>
            )}
        </div>
    );
};

export default SearchComponent;
