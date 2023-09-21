export type inventoryType = {
    id: number,
    count: number,
    coordinates: number[],
    img: string
}

export type ItemProps = {
    Inventory: inventoryType | undefined
}

export type Notification = {
    text: string
}