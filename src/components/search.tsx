import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchType {
    onChange: (value: any)=> void,
}

const  Search = ({onChange}: SearchType )=> {
    return (
        <Input
            style={{height:'42px'}}
            placeholder="Enter product name"
            suffix={
                    <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            }
            allowClear
            onChange={onChange}
        />
    );
}

export default Search;
