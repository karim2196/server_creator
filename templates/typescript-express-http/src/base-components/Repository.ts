
export class Repository<T> {
    protected static formatContainsOperator(filters: any): any {
        // In options.filters (q) we can receive here a $contains operator. We will need to translate
        // the $contains operator to a regex, for example:
        // status[$contains]:in => {status: /.*in.*/}
        if (typeof filters === 'object') {
            for (let key of Object.keys(filters)) {
                if (key === '$contains') {
                    //base case
                    filters = {$regex: filters[key], $options: 'i'};
                    return filters;
                } else if ([ 'orderDate'].includes(key)) {
                    for (let dateKey of Object.keys(filters[key])) {
                        filters[key][dateKey] = new Date(filters[key][dateKey]);
                    }
                } else {
                    //console.log('Recursive Case', filters[key]);
                    let elem = this.formatContainsOperator(filters[key]);
                    filters[key] = elem;
                }
            }
            return filters;
        } else {
            return filters;
        }
    }

    protected async getAll(): Promise<T[]> {
        return [];
    }

    protected async getById(id: string): Promise<T | null> {
        return null;
    }
}
