import { ColumnContainer, ColumnTitle } from "./styles";
import { FC } from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card"
import { addTask } from "./state/actions";

//Define props as type:
type ColumnProps = {
    text: string
    // We’ll need this value to find the corresponding tasks.
    id: string
};

//The below syntax is a short hand for:
// type ColumnProps = {
//     text: string
//     children?: React.ReactNode;
// }>

export const Column = ({ text, id }: ColumnProps) => {
    const { getTasksByListId, dispatch } = useAppState()
    const tasks = getTasksByListId(id)
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map((task) => (
                <Card text={task.text} key={task.id} id={task.id}/>
            ))}
            <AddNewItem
                toggleButtonText="+ Add another card"
                onAdd={text =>
                    dispatch(addTask(text, id))
                }
                dark
            />
        </ColumnContainer>
    )
}