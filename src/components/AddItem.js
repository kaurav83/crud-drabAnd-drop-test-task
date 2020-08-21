import React, {useState} from 'react';

const AddItem = (props) => {
    const [state, setValueToSubmit] = useState({title: "", body: ""});

    const handleAddItem = (e) => {
        e.preventDefault();
    
        props.handleAddItem(state);
        setValueToSubmit({title: "", body: ""})
    }

    const handleFields = (e) => {
        const {name, value} = e.target;
        setValueToSubmit(
            prevState => ({
                ...prevState, [name]: value
            })
        );
    };

    return(
        <form 
            onSubmit={handleAddItem}
            className="add-item"
        >
            <input 
                type="text"
                onChange={handleFields}
                name="title"
                value={state.title}
                required
                className="add-item__margin--top field"
                placeholder="Введите заголовок"
            />
            <input 
                type="text"
                onChange={handleFields}
                name="body"
                value={state.body}
                required
                className="add-item__margin--top field"
                placeholder="Введите сообщение"
            />
            <button
                className="add-item__margin--top button"
            >Добавить пост</button>
        </form>
    )
};

export default AddItem;