import React from 'react';
import {Link, useParams } from 'react-router-dom';


export const AdEditPage = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>Редактирование объявления</h1>
            <p>Id объявления: {id}</p>
            <Link to={`/ads/${id}`}>Вернуться к объявлению</Link>
        </div>
    )
}