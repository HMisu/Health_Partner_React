const UserStepList = ({data}) => {
    return (
        <article className="UserStepList">
            <ul>
                {data.map((item, idx) => (
                    <li key={idx}>{idx}일 <span>{item}보</span></li>
                ))}
            </ul>
        </article>
    );
};

export default UserStepList;