import {useEffect, useState} from "react";
import {Api} from "./api/api";
import folder from './access/folder.png'
import clas from './app.module.css'
import Folder from "./components/folder";

function App() {
    const [loading, setLoading] = useState(true)
    const [folders, serFolders] = useState()

    const [isFolderOpen, setIdFolderOpen] = useState(false)
    const [folderData, setFolderData] = useState(
        [{nama: 'avatar', type: 'png', atime: '123', mtime: '12', dev: 2332}]
    )


    useEffect(() => {
        Api.get().then(res => {
            if (res.data.ok === 1) {
                serFolders(res.data.data.files)
            }
        }).then(() => {
            setLoading(false)
        })
    }, [])

    function handleChange(data) {
        setIdFolderOpen(true)
        setFolderData(data)
    }


    return (
        isFolderOpen
            ? <Folder setIdFolderOpen={setIdFolderOpen} folderData={folderData}/>
            : !!loading
                ? <div>loading</div>
                :
                <div className={clas.pageContainer}>

                    <div className={clas.allFoldersContainer}>
                        {Object.entries(folders).map(([key, value], index) => (
                            <div onClick={()=>handleChange(value)} key={index} className={clas.fileContainter}>
                                <img className={clas.img} src={folder} alt=""/>
                                <div className={clas.description}>
                                    {key}
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
    );
}

export default App;
