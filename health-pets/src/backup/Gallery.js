import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SapoImage from '../../assets/images/pet-frog.png'

const handleDragStart = (e) => e.preventDefault();

const items = [
    <img src= { SapoImage } onDragStart={handleDragStart} role="presentation" />,
    <img src= {SapoImage} onDragStart={handleDragStart} role="presentation" />,
    <img src= {SapoImage} onDragStart={handleDragStart} role="presentation" />,
];

export default function BasicCard() {
    return (
        <AliceCarousel mouseTracking items={items} />
    );
}