import React from 'react';
import { Wrapper, Container } from './styled/appStyled';
import './App.css';
import { productApi } from "./services/productApi";
import { ProductTable } from "./components";
import { ProductType } from "./utils/types";
import { notification } from 'antd'

const key = 'updatable';
let timeout:any;

function App() {
    const  [productList, setProductList] = React.useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 20,
    });
    const [api, contextHolder] = notification.useNotification();
    const [total, setTotal] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState<string>("");

    const openNotification = ({message, description}:{message: string, description: string}) => {
        api.open({
            key,
            message: message,
            description: description,
        });
    };

    const handleReachEnd = React.useCallback(() => {
        setPagination(prevState => {
            return {
                ...prevState,
                current:  prevState.pageSize * prevState.current >= total
                        ? prevState.current
                        : prevState.current + 1,
            };
        });
    }, [total]);

    React.useEffect(()=>{
        const getAllProduct = async ()=>{
            try {
                setIsLoading(true);
                let result:any;

                if(searchValue){
                    result  = await productApi.search({
                        q: searchValue,
                        select: "title,price,images",
                        limit: pagination.pageSize,
                        skip: pagination.current * (pagination.pageSize -1),
                    });
                }else {
                    result  = await productApi.getAll({
                        limit: pagination.pageSize,
                        skip: pagination.current * (pagination.pageSize -1),
                        select: "title,price,images"
                    });
                }

                const { products, total } = result;
                setTotal(total);

                if(products?.length > 0 && pagination.current != 1){
                    setProductList([...productList, ...products]);
                }else if( pagination.current == 1){
                    setProductList(products);
                }
            }
            catch (error: any){
                openNotification({
                    message:"Load list product error",
                    description:"Loading error"
                })
            }finally {
                setIsLoading(false);
            }
        }

        getAllProduct();
    },[pagination, searchValue])

    const handleChangeSearchValue = (e:any) =>{
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            setSearchValue(e.target.value);
            setPagination(prevState => {
                return {
                    ...prevState,
                    current: 1,
                };
            });
            timeout = null;
        }, 1000);
    }

  return (
    <Wrapper className="App">
      <Container>
        <ProductTable onChangeProduct={handleChangeSearchValue}
                      isLoading={isLoading}
                      handleReachEnd={handleReachEnd}
                      productsData={productList} />
      </Container>
    </Wrapper>
  );
}

export default App;
