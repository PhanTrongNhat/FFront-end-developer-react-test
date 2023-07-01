import React from 'react';
import { Table } from 'antd';
import { ProductType } from "../../utils/types";
import { Image, Title, Price, ProductTitle, ProductTableHeaderWrapper } from "./styled";
import { VList } from 'virtuallist-antd';
import { Search } from "../index";

const defaultImage = "/image/image.jpg";

const columns: Array<any> = [
    {
        title: 'Image',
        dataIndex: 'images',
        render: (value: string[]) =>{

            return <Image src={value?.length? value[0]:defaultImage} alt={"product image"}></Image>;
        }

    },
    {
        title: 'Title',
        dataIndex: 'title',
        render: (value: string) => <Title>{value}</Title>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (value: string) => <Price>{value}$</Price>,
    },

];

interface  ProductTableType {
    productsData: ProductType[],
    handleReachEnd: ()=> void;
    isLoading: boolean;
    onChangeProduct: (value: any)=> void,
}

const ProductTable  = ({ productsData, handleReachEnd, isLoading, onChangeProduct }: ProductTableType) => {
    const vc = React.useMemo(
        () =>
            VList({
                height:
                         window.innerHeight - 192,
                onReachEnd: handleReachEnd,
            }),
        [handleReachEnd]
    );

    return (
        <div>
            <ProductTableHeaderWrapper>
                <ProductTitle>
                    Product list
                </ProductTitle>
                <Search onChange={onChangeProduct}></Search>
            </ProductTableHeaderWrapper>
            <Table
                scroll={{
                    y: window.innerHeight - 192,
                }}
                loading={isLoading}
                pagination={false}
                columns={columns}
                dataSource={productsData}
                components={vc}
            />
        </div>
    );
};

export default ProductTable;