import React from 'react'
import './Item.css'

export const Item = ({ item }) => {
    return(
        <div className="item-container">
            <div className="icon-container">
                <img className="item-icon" src={item.icon_url} alt="" />
            </div>
            <span>{item.quantity}</span>
        </div>
    )
}
