import Pizza1 from '../images/Promo.gif';
import Pizza2 from '../images/Veg.gif';
import Pizza3 from '../images/Non-veg.gif';
import Pizza4 from '../images/Premium.gif';
import Pizza5 from '../images/Desserts.gif';
import Pizza6 from '../images/Drinks.gif';
import Pizza7 from '../images/New.gif';


import CheesePizza from '../images/Veg Pizza/Cheese_Tomato.png';
import Devilled_Panner from '../images/Veg Pizza/Devilled_panner.png';
import Double_cheese_Margherita from '../images/Veg Pizza/double_cheese_mangherita.png';
import Farm_House from '../images/Veg Pizza/Farm_house.png';
import Gourmet from '../images/Veg Pizza/Gourmet.png';
import Hot_Butter_Mushroom from '../images/Veg Pizza/Hot_butter_mushroom.png';
import Margherita_veg from '../images/Veg Pizza/Mangherita_pizza.png';
import Mix_Veg from '../images/Veg Pizza/mix_veg.png';
import OPizza_special_mix from '../images/Veg Pizza/OPizza_special_mix.png';
import Tandoori_Panner from '../images/Veg Pizza/Tandoori_panner.png';


export const categoryData = [
    {id:1, name: 'Promo', decp: 'New items and things', imgsrc: Pizza1},
    {id:2, name: 'Veg Pizza', decp: 'All kind of vegetables', imgsrc: Pizza2},
    {id:3, name: 'Non-Veg', decp: 'Chicken and sea food items',  imgsrc: Pizza3},
    {id:4, name: 'Premium', decp: 'The special items in Jaffna', imgsrc: Pizza4},
    {id:5, name: 'Desserts', decp: 'Choco bread, Garlic bread', imgsrc: Pizza5},
    {id:6, name: 'Soft Drinks', decp: 'Coco and Pepsi soda items ', imgsrc: Pizza6},
    {id:7, name: 'New items', decp: 'Pasta and Briyani items', imgsrc: Pizza7},
]

export const VegPizzaData = [
  {id:1, name: 'Cheese Tomato', imgsrc: CheesePizza, price: "1000.00"},
  {id:2, name: 'Devilled Panner', imgsrc: Devilled_Panner, price: "1500.00"},
  {id:3, name: 'Double cheese Margherita', imgsrc: Double_cheese_Margherita, price: "2000.00"},
  {id:4, name: 'Farm House', imgsrc: Farm_House, price: "800.00"},
  {id:5, name: 'Gourmet', imgsrc: Gourmet, price: "750.00"},
  {id:6, name: 'Hot Butter Mushroom', imgsrc: Hot_Butter_Mushroom, price: "1300.00"},
  {id:7, name: 'Margherita Veg', imgsrc: Margherita_veg, price: "350.00"},
  {id:8, name: 'Mix Veg', imgsrc: Mix_Veg, price: 700.00},
  {id:9, name: 'O Pizza Special Mix ' , imgsrc: OPizza_special_mix, price: "600.00"},
  {id:10, name: 'Tandoori Panner', imgsrc: Tandoori_Panner, price: "900.00"},
]

export const categories = [
    {  id: 1, name: "Promo", urlParamName: "Promo",},
    {  id: 2,  name: "Veg-Pizza", urlParamName: "Veg-Pizza",},
    {  id: 3,  name: "Non-Veg",  urlParamName: "Non-Veg", },
    {  id: 4, name: "Premium", urlParamName: "Premium", },
    {  id: 5, name: "Desserts",  urlParamName: "Desserts",},
    { id: 6,  name: "Soft Drinks",  urlParamName: "Soft Drinks", },
    {  id: 7,  name: "New Items",  urlParamName: "New Items",}, 
    ];