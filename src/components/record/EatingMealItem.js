const EatingMealItem = () => {
    return (
        <article className="EatingMealItem">
            <div>
                <div className="mealTime">breakfast</div>
                <div className="foodList">
                    <div className="food">
                        <span className="name">돼지고기 김치찌개</span>
                        <span className="kcal">350kcal</span>
                    </div>
                    <div className="food">
                        <span className="name">쌀밥</span>
                        <span className="kcal">180kcal</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default EatingMealItem;