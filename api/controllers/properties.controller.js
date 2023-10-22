import property from "../models/properties.model.js"

export const propeties = async (req, res) => {
    try {
        console.log("search items", req.query)
        const properties = await property.find(req.query)

        if(properties.length === 0) {
            return res.status(404).json({status: 404, message: "Properties not found"})
        }

        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({status: 500, message: "Server Internal Error", error: error.message})
    }
}

export const createProperty = async (req, res) => {
    try {
        const {name, address, price, type, imageUrl, userId} = req.body

        const newProperty = new property(
            {
                name,
                address,
                price,
                type,
                imageUrl,
                userId: req.user._id
            }
        )

        if(!newProperty) {
            return res.status(400).json({status: 400, message: "Propety was not created "})
        }

        await newProperty.save()

        res.status(200).json({status: 200, message: "Property created successfully"})
        
    } catch (error) {
        res.status(500).json({status: 500, message: "Server Internal Error", error: error.message})
    }
}

