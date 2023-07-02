import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { CInput } from "./styled";

interface SearchType {
    onChange: (value: any)=> void,
}

const  Search = ({onChange}: SearchType )=> {
    return (
        <CInput
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

