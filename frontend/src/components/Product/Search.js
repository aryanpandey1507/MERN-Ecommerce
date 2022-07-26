import { Fragment ,useState  } from "react";
import {useNavigate} from 'react-router';
import MetaData from "../layout/metaData";
import './Search.css'


function Search() {

    const [keyword , setKeyword]= useState('');
    const navigate = useNavigate();
    const searchSubmitHandler=(e)=>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate('/products')
        }
    }

    return (
        <Fragment>
            <MetaData title = "Search a product" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input 
             type='text'
             placeholder="Search a Product..."
             onChange= {(e)=>setKeyword(e.target.value)}/>
             <input type= 'submit' value="Search" />
        </form>
        </Fragment>
      );
}

export default Search;