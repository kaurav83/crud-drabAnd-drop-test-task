import React, {useState, useRef, useEffect} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {otherOrder} from '../helpers/dragAndDrop';

const Items = ({items, handleRemoveItem, setNewItem}) => {
    const [editField, setEditField] = useState(0);
    const [itemsDrg, setItemsDrg] = useState([]);
    const fieldRef = useRef(null);

    useEffect(() => {
        setItemsDrg(items);
    }, [items])

    useEffect(() => {
        if (editField) {
            fieldRef.current.focus();
        }
    }, [editField]);

    const handleEditItem = (e, pointItem) => {
        setEditField(pointItem.id);
    }

    const handleGetValue = (e, id) => {
        setNewItem(e.target.value, id)
    }

    const handleSubmitEdition = () => {
        setEditField(0);
    }

    const handleBlurField = (e) => {
        setEditField(0);
    }

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const itemsDrug = otherOrder(
            itemsDrg,
            result.source.index,
            result.destination.index
        );

        setItemsDrg(itemsDrug)
    }
    
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
        {(provided) => {
            return(
            <ul 
                className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
            {
                itemsDrg.map((item, index) => {
                    return (
                        <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}
                        >
                        {(provided) => {
                        return (
                        <li 
                            key={item.id} 
                            className="list__item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}    
                        >
                            {
                                editField === item.id ?
                                    <div className="list__edit-block">
                                        <input 
                                            type="text"
                                            onChange={(e) => handleGetValue(e, item.id)}
                                            name="edit"
                                            className="list__edit-field"
                                            onBlur={handleBlurField}
                                            ref={fieldRef}
                                        />
                                        <span 
                                            className="list__edit-field-submit"
                                            onClick={handleSubmitEdition}
                                        />
                                    </div>
                                    :
                                    <span 
                                        onDoubleClick={(e) => handleEditItem(e, item)}
                                        className="list__message"
                                        title="кликни дважды, чтобы редактировать"
                                    >{item.title}</span>
                            }
                            
                            <span 
                                onClick={() => handleRemoveItem(item.id)} className="list__to-trash" 
                                title="Удалить пост" 
                            />
                        </li>
                        )
                        }}
                        </Draggable>
                    );
                })
            }
            {provided.placeholder}
        </ul>
        )
        }}
        </Droppable>
        </DragDropContext>
    )
}

export default Items;