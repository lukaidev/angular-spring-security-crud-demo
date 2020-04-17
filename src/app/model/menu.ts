export interface Menu {
    id: number;
    name: string;
    inUsed: boolean;
    menuItems: MenuItem[];
}

export interface MenuPage {
    pages: number;
    elements: number;
    results: Menu[];
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
}
