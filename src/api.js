import axios from "axios";

function unpackFiles (vendors) {
    const files = [];
    const allBoards = [];

    for (const vendor in vendors) {
        if (!vendors.hasOwnProperty(vendor)) continue;
        const boards = vendors[vendor];

        for (const board in boards) {

            if (vendor === "4chan") allBoards.push({board: boards[board].name, description: boards[board].description});

            if (!boards.hasOwnProperty(board)) continue;
            const { threads } = boards[board];

            threads.forEach(thread => {
                files.push(...thread.files.map(file => ({...file, board: boards[board].name})));
            })
        }
    }
    
    return {
        files,
        boards: allBoards,
    };
}

const api = axios.create({
    baseURL: "http://5.180.138.37:3500/",
    responseType: "json"
});

export const getFiles = async () => {
    const { data } = await api.get('files/getAll');
    return Promise.resolve(unpackFiles(data.vendors));
};