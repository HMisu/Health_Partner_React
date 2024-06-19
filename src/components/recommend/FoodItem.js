const FoodItem = ({food}) => {
    const img_url = process.env.PUBLIC_URL + 'assets/fruits-7434339_640.jpg';
    return (
        <div className="FoodItem">
            <img src={img_url} alt=""/>
            <div className="caption">
                <div className="name">{food.name}</div>
                <div className="nutrient">
                    칼로리 {food.energy}kcal<br/>
                    단백질 {food.protein}g<br/>
                    탄수화물 {food.carbohydrates}g<br/>
                    지방 {food.fat}g
                </div>
            </div>
        </div>
    );
};

export default FoodItem;