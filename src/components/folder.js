import React, {useEffect, useState} from 'react';
import clas from "./folder.module.css";
import fileImg from "../access/file.png";

const Folder = ({folderData,setIdFolderOpen}) => {
    const  cookieSOrtType =document.cookie.
            split(';')
            .find(e=>e.match('sortType'))
            ?.split('=')
            .pop()
            || 'name'

    const [data,setData]=useState(folderData)
    const [sortyngType, setSortyngType] = useState(cookieSOrtType)
    const [sortedData,setSortedData]=useState(data.sort((x,y)=>Sort(x,y,sortyngType)))

    function Sort(x, y,type){
        if (x[type] < y[type]) {return 1;}
        if (x[type] > y[type]) {return -1;}
        return 0;
    }
    const handleChange=(e)=>{
        setSortyngType(e.target.value)
    }

    useEffect(()=>{
        return()=>{
            document.cookie = `sortType=${sortyngType}`
        }
    },[sortyngType])

    return (
        <div className={clas.folderContainer}>
            <div onClick={()=>{setIdFolderOpen(false)}} className={clas.back}>&#8592;	</div>

            <div className={clas.sorting}>

                <div>
                    <label htmlFor="sorting">сортувати за</label><br/>
                    <select defaultValue={sortyngType} onChange={handleChange} id='sorting' className={clas.sortingSelect}>
                        <option value={'name'} label="іменем"/>
                        <option value={'mtime'} label="датою"/>
                        <option value={'size'} label="розміром"/>
                    </select>
                </div>

            </div>
            <div className={clas.allFoldersContainer}>
                {sortedData.map((file,index)=>(
                    <div key={index} className={clas.fileContainter} >
                        <img className={clas.img} src={fileImg} alt=""/>
                        <div className={clas.description}>

                             {file.name} <br/>
                              {new Date(file.mtime).toLocaleDateString() } <br/>

                            {!file.size && '0.kb'}
                            { !!file.size  &&  Math.round(file.size /1024)+'.kb'}

                        </div>


                    </div>
                ))}
            </div>

        </div>
    );
};

export default Folder;