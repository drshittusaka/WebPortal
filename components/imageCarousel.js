import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography } from '@mui/material'


function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p><Typography noWrap>{props.item.description}</Typography></p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}




 export default function ImageCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

