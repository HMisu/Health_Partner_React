const UserPedometerList = ({data}) => {
    return (
        <article className="UserPedometerList">
            <ul>
                {data.map((item, idx) => (
                    <li key={idx}>{idx}일 <span>{item}보</span></li>
                ))}
            </ul>
        </article>
    );
};

export default UserPedometerList;