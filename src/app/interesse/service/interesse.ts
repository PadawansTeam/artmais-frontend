export class Interesse {
    public isSelected: boolean | undefined
    constructor(
        public subcategory: string,
        public subcategoryID: number,
        public category: string,
    ) { }
}
