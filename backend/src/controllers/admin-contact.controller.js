import { listContacts } from "../services/admin-contact.service.js";

export const listContactsController = async (req, res) => {
    const result = await listContacts({
        page: req.query.page,
        pageSize: req.query.pageSize
    });

    res.json(result);
}