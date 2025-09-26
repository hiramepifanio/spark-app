import { createContext, useReducer } from "react";
import NotificationQueue from "../components/NotificationQueue/NotificationQueue";

export const NotificationContext = createContext({
  notifications: [],
  addErrorNotification: () => {},
  addSuccessNotification: () => {},
  removeNotification: () => {},
})

function notificationReducer(state, action) {

  if (action.type === 'ADD') {
    const updatedNotifications = [...state.notifications]
    updatedNotifications.push({
      id: action.payload.id,
      message: action.payload.message,
      type: action.payload.type,
    })
    
    return {
      ...state,
      notifications: updatedNotifications
    }
  }

  if (action.type === 'REMOVE') {
    const id = action.payload.id
    const updatedNotifications = [...state.notifications].filter((notification => notification.id !== id))

    return {
      ...state,
      notifications: updatedNotifications
    }
  }

  return state
}

export function NotificationContextProvider({ children }) {
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, {
    notifications: []
  })

  function handleAddNotification(type, message) {
    const id = Date.now() + Math.random()
    notificationDispatch({
      type: 'ADD',
      payload: { id, type, message }
    })

    setTimeout(() => {
      notificationDispatch({
        type: 'REMOVE',
        payload: { id }
      })
    }, 5000);
  }

  function handleAddErrorNotification(message) {
    handleAddNotification('ERROR', message)
  }

  function handleAddSuccessNotification(message) {
    handleAddNotification('SUCCESS', message)
  }

  const contextValue = {
    notifications: notificationState.notifications,
    addErrorNotification: handleAddErrorNotification,
    addSuccessNotification: handleAddSuccessNotification,
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationQueue />
    </NotificationContext.Provider>
  )
}