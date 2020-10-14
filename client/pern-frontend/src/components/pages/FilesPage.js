import React, { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import './FilesPage.scss'
function FilesPage() {
    const [filesList, setFilesList] = useState([]);
    const [formActive, setFormActive] = useState(false);
    const getFiles = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/files",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setFilesList(parseRes);
            console.log(parseRes);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getFiles();
    }, [])

    return (
        <div className="filesPage">
            <StudentNavbar />
            <div className="filesList">
                <div className="header"><h2>Files</h2></div>
                <ol className="unorderedListFiles">
                    {filesList.map((file) => (
                        <li>
                            <a target="_blank" href={file.file_upload}>{file.file_description}</a>
                        </li>
                    ))}
                </ol>
                <button onClick={() => setFormActive(true)} className="addAFileButton">Add a File</button>
                <div className={formActive ? "addAFileForm" : "formNotActive"}>
                    <button className="closeFormButton" onClick={() => setFormActive(false)}>X</button>
                    <form>
                        <label>
                            File Link:
                            <input type="text" />
                        </label>
                        <br />
                        <label>
                            File Name/Description:
                            <input type="text" />
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default FilesPage
