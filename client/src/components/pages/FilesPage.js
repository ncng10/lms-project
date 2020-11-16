import React, { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar'
import './FilesPage.scss'
function FilesPage() {
    const [filesList, setFilesList] = useState([]);
    const [formActive, setFormActive] = useState(false);
    const [inputs, setInputs] = useState({
        file_upload: "",
        fileDescription: "",
    })
    const { file_upload, fileDescription } = inputs;
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const getFiles = async () => {
        try {
            const response = await fetch("/course-page/files",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setFilesList(parseRes);
        } catch {
        }
    }

    const uploadFile = async (e) => {
        e.preventDefault();
        try {
            const body = { file_upload, fileDescription };
            const response = await fetch(
                "/course-page/upload-file",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
        } catch (error) {
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
                            <a target="_blank" rel="noopener noreferrer" href={file.file_upload}>{file.file_description}</a>
                        </li>
                    ))}
                </ol>
                <button onClick={() => setFormActive(true)} className="addAFileButton">Add a File</button>
                <div className={formActive ? "addAFileForm" : "formNotActive"}>
                    <button className="closeFormButton" onClick={() => setFormActive(false)}>X</button>
                    <form onSubmit={e => uploadFile(e)}>
                        <label>
                            File Link:
                            <input onChange={e => { onChange(e); }} type="text" name="file_upload" value={file_upload} />
                        </label>
                        <br />
                        <label>
                            File Name/Description:
                            <input onChange={e => { onChange(e); }} type="text" name="fileDescription" value={fileDescription} />
                        </label>
                        <button>Add This File</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default FilesPage
