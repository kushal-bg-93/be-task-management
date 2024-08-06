const query={

    findOne:async(collection,data={},project={})=>{
        const model=require(`../../models/schema/${collection}`)
        const result=await model.findOne(data,project)
        return result;
    },
    insertOne:async(collection,insertData)=>{
        const model=require(`../../models/schema/${collection}`)
        const data=new model(insertData)
        await data.save();
        return data
    }
}

module.exports=query