import DinosaursProvider from "../services/dinosaursProvider.js";
import FoodProvider from "../services/nourritureProvider.js";

export default class Favoris{
    async render(){

        let favoris = localStorage.getItem("favoris");
        favoris = JSON.parse(favoris);
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let foods = await FoodProvider.fetchFoods();
        let favorisList = document.createElement("div");
        favorisList.setAttribute("id", "listView");
        let ol = document.createElement("ol");

        favoris.forEach(id => {
            let li = document.createElement("li");
            let dino = dinosaurs.find(d => d.id == id);
            if(dino){
                li.innerHTML = `
                    <a href="#/dinosaurs/${dino.id}">
                        <figure>
                            <img src="${dino.image}" alt="${dino.nom}">
                            <figcaption>"${dino.nom}"</figcaption>
                        </figure>
                    </a>
                `;
            } else {
                let food = foods.find(f => f.id == id);
                li.innerHTML = `
                    <a href="#/nourritures/${food.id}">
                        <figure>
                            <img src="${food.image}" alt="${food.nom}">
                            <figcaption>"${food.nom}"</figcaption>
                        </figure>
                    </a>
                `;
            }
            ol.appendChild(li);
        });
        favorisList.appendChild(ol);
        return favorisList.outerHTML;
    }
}