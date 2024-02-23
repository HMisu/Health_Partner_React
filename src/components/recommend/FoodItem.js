const FoodItem = () => {
    const img_url = process.env.PUBLIC_URL + 'assets/salad.jpg';
    return (
        <div className="FoodItem">
            <img src={img_url} alt=""/>
            <div className="caption">
                <div className="name">닭가슴살 샐러드</div>
                <div className="nutrient">
                    단백질 10g<br/>
                    탄수화물 30g<br/>
                    지방 2g
                </div>
            </div>
        </div>
    );
};

export default FoodItem;