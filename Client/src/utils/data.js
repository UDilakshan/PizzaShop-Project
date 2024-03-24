import Pizza1 from '../images/Category/Offers.gif';
import Pizza2 from '../images/Category/Veg.gif';
import Pizza3 from '../images/Category/Non-veg.gif';
import Pizza4 from '../images/Category/Premium.gif';
import Pizza5 from '../images/Category/Desserts.gif';
import Pizza6 from '../images/Category/Drinks.gif';
import Pizza7 from '../images/Category/New.gif';


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



import Bbq_pizza from '../images/Non-veg/Bbq_pizza.png';
import Devilled_Chicken from '../images/Non-veg/Devilled_Chicken.png';
import Hot_butter_chicken from '../images/Non-veg/Hot_butter_chicken.png';
import Jaffna_curry_chicken from '../images/Non-veg/Jaffna_curry_chicken.png';
import Sausage_delight from '../images/Non-veg/Sausage_delight.png';
import Tandoori_chicken from '../images/Non-veg/Tandoori_chicken.png';





import Beef_Pepperoni from '../images/Premium non-veg/Beef_Pepperoni.png';
import Chicken_Hawaiian from '../images/Premium non-veg/Chicken_Hawaiian.png';
import Fish_Ambul_Thiyal from '../images/Premium non-veg/Fish_Ambul_Thiyal.png';
import Garlic_Prawns from '../images/Premium non-veg/Garlic_Prawns.png';
import Jaffna_Mix_Toppings from '../images/Premium non-veg/Jaffna_Mix_Toppings.png';
import Seafood_Hawaiian from '../images/Premium non-veg/Seafood_Hawaiian.png';
import Tuna_Fish from '../images/Premium non-veg/Tuna_Fish.png';


import Cheesy_garlic_bread from '../images/Desserts/Cheesy_garlic_bread.png';
import Choco_bread from '../images/Desserts/Choco_bread.png';
import non_veg_calzone from '../images/Desserts/non_veg_calzone.png';
import veg_calzone from '../images/Desserts/veg_calzone.png';
import Chicken_dum_briyani from '../images/New to menu/Chicken_dum_briyani.png';
import Pasta from '../images/New to menu/Pasta.png';

import offer1 from '../images/Offers/offer1.png';
import offer2 from '../images/Offers/offer2.png';
import offer3 from '../images/Offers/offer3.png';
import offer4 from '../images/Offers/offer4.png';
 

export const DessertsData = [
  {id:1, name: 'Cheesy garlic bread', imgsrc: Cheesy_garlic_bread, price: "1040.00"},
  {id:2, name: 'Choco bread', imgsrc: Choco_bread, price: "1040.00"},
  {id:3, name: 'Non_veg_calzone', imgsrc: non_veg_calzone, price: "1040.00"},
  {id:4, name: 'Veg calzone', imgsrc: veg_calzone, price: "1040.00"},
];


export const categoryData = [
    {id:1, name: 'Offers', decp: 'New items and things', imgsrc: Pizza1 ,name: "Offers", urlParamName: "Offers"},
    {id:2, name: 'Veg Pizza', decp: 'All kind of vegetables', imgsrc: Pizza2,name: "Veg-Pizza", urlParamName: "Veg-Pizza" },
    {id:3, name: 'Non-Veg', decp: 'Chicken and sea food items',  imgsrc: Pizza3, name: "Non-Veg",  urlParamName: "Non-Veg" },
    {id:4, name: 'Premium', decp: 'The special items in Jaffna', imgsrc: Pizza4,name: "Premium", urlParamName: "Premium" },
    {id:5, name: 'Desserts', decp: 'Choco bread, Garlic bread', imgsrc: Pizza5,name: "Desserts",  urlParamName: "Desserts" },
    {id:6, name: 'Soft Drinks', decp: 'Coco and Pepsi soda items ', imgsrc: Pizza6,name: "Soft Drinks",  urlParamName: "Soft Drinks" },
    {id:7, name: 'New items', decp: 'Pasta and Briyani items', imgsrc: Pizza7, name: "New Items",  urlParamName: "New Items" },
]

export const categoryData2 = [
  {  id: 1, name: "Category", urlParamName: "Category",}
]

export const VegPizzaData = [
  {id:1, name: 'Cheese Tomato', imgsrc: CheesePizza, price: "585.00"},
  {id:2, name: 'Devilled Panner', imgsrc: Devilled_Panner, price: "980.00"},
  {id:3, name: 'Double cheese Margherita', imgsrc: Double_cheese_Margherita, price: "760.00"},
  {id:4, name: 'Farm House', imgsrc: Farm_House, price: "845.00"},
  {id:5, name: 'Gourmet', imgsrc: Gourmet, price: "845.00"},
  {id:6, name: 'Hot Butter Mushroom', imgsrc: Hot_Butter_Mushroom, price: "975.00"},
  {id:7, name: 'Margherita Veg', imgsrc: Margherita_veg, price: "585.00"},
  {id:8, name: 'Mix Veg', imgsrc: Mix_Veg, price: "980.00"},
  {id:9, name: 'O Pizza Special Mix ' , imgsrc: OPizza_special_mix, price: "980.00"},
  {id:10, name: 'Tandoori Panner', imgsrc: Tandoori_Panner, price: "980.00"},
]

export const OffersData = [
  {id:1, name: '1999 offer', imgsrc: offer1, price: "1999.00"},
  {id:2, name: '2499 offer', imgsrc: offer2, price: "2499.00"},
  {id:3, name: '2999 offer', imgsrc: offer3, price: "2999.00"},
  {id:4, name: '3200 offer', imgsrc: offer4, price: "3200.00"},
]



export const NonVegPizzaData = [
  {id:1, name: 'Bbq pizza', imgsrc: Bbq_pizza, price: "820.00"},
  {id:2, name: 'Devilled Chicken', imgsrc: Devilled_Chicken, price: "885.00"},
  {id:3, name: 'Hot butter chicken', imgsrc: Hot_butter_chicken, price: "885.00"},
  {id:4, name: 'Jaffna curry chicken', imgsrc: Jaffna_curry_chicken, price: "820.00"},
  {id:5, name: 'Sausage delight', imgsrc: Sausage_delight, price: "820.00"},
  {id:6, name: 'Tandoori chicken', imgsrc: Tandoori_chicken, price: "885.00"},
]

export const categories = [
    {  id: 1, name: "Offers", urlParamName: "Offers",},
    {  id: 2,  name: "Veg-Pizza", urlParamName: "Veg-Pizza",},
    {  id: 3,  name: "Non-Veg",  urlParamName: "Non-Veg", },
    {  id: 4, name: "Premium", urlParamName: "Premium", },
    {  id: 5, name: "Desserts",  urlParamName: "Desserts",},
    { id: 6,  name: "Soft Drinks",  urlParamName: "Soft Drinks", },
    {  id: 7,  name: "New Items",  urlParamName: "New Items",}, 
    ];



export const PremiumNonVegPizzaData = [
  {id:1, name: 'Beef Pepperoni', imgsrc: Beef_Pepperoni, price: "1040.00"},
  {id:2, name: 'Chicken Hawaiian', imgsrc: Chicken_Hawaiian, price: "1040.00"},
  {id:3, name: 'Fish Ambul Thiyal', imgsrc: Fish_Ambul_Thiyal, price: "1040.00"},
  {id:4, name: 'Garlic Prawns', imgsrc: Garlic_Prawns, price: "1040.00"},
  {id:5, name: 'Jaffna Mix Toppings', imgsrc: Jaffna_Mix_Toppings, price: "1040.00"},
  {id:6, name: 'Seafood Hawaiian', imgsrc: Seafood_Hawaiian, price: "1040.00"},
  {id:7, name: 'Tuna Fish', imgsrc: Tuna_Fish, price: "1040.00"},
];






/* + */

export const NewtoMenuData = [
  {id:1, name: 'Chicken Dum Briyani', imgsrc: Chicken_dum_briyani, price: "1040.00"},
  {id:2, name: 'Pasta', imgsrc: Pasta, price: "1040.00"},
];



export const contact_types = [
  { id: 1, name: "Order Inquiry", urlParamName: "Order Inquiry",},
  { id: 2, name: "Appericiation", urlParamName: "Appericiation",},
  { id: 3, name: "Complaint", urlParamName: "Complaint",},
];

