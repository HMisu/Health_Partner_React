const EatingMealItem = () => {
    const img_url = process.env.PUBLIC_URL + 'assets/food.jpg';
    return (
        <article className="EatingMealItem">
            <div
                style={{
                    backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.3),
                        rgba(0, 0, 0, 0.3)
                    ), url(${img_url})`
                }}>
                <div className="mealtime">breakfast</div>
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