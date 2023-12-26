import React from 'react';
import { useState } from 'react';
import env from '../env.json';

function Create() {

    const [url, setUrl] = useState('');
    const [lineClass, setLineClass] = useState('hide');
    const [formClass, setFormClass] = useState(''); 

    let sendData = (obj) => {
        setFormClass('hide');
        setLineClass('');
        fetch(env.urlBackend, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj)
        })
            .then( response => response.json())
            .then(response => {
                console.log(response);
                if (response.result) {
                    setUrl(env.url+'/'+response.url);
                }
            })
    }

    let loadDataFromForm = (event) => {
        event.preventDefault();
        let note = event.target.elements.note.value;
        note = note.trim();
        if (note === '') {
            alert('Заполните поля');
            return false;
        }
        sendData({"note" : note});
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="text">
                    <form action="" onSubmit={loadDataFromForm} className={formClass}>
                        <div className="form-group">
                            <label htmlFor="note">Enter note</label>
                            <textarea name="note" className="form-control" defaultValue="Write your note" id="note"></textarea>
                        </div>
                        <div className="form-group text-right">
                            <button type="submit" className="btn btn-secondary">Create</button>
                        </div>
                        
                    </form>
                    <div className={lineClass}>
                        <div className="alert alert-secondary">{url}</div>
                        <div className="text-right"><button onClick={function () { window.location.reload() }} className="btn btn-secondary">Create another note</button></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Create;