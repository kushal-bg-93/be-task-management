const query={

    findOne:async(collection,data={},project={})=>{
        try {
            const model=require(`../../models/schema/${collection}`)
            const result=await model.findOne(data,project)
            return result;
            
        } catch (error) {
            console.log(error.message)
        }
    },
    find:async(collection,data={},project={})=>{
        try {
            
            const model=require(`../../models/schema/${collection}`)
            const result=await model.find(data,project)
            return result;
        } catch (error) {
            console.log(error.message)
        }
    },
    insertOne:async(collection,insertData)=>{
        try {
            
            const model=require(`../../models/schema/${collection}`)
            const data=new model(insertData)
            await data.save();
            return data
        } catch (error) {
            console.log(error.message)
        }
    },
    pagination:async(collection,query,sort,limit,pageNo,project={})=>{
        let skip=(pageNo-1)*limit
        const model=require(`../../models/schema/${collection}`)

        let pipeline =[
            {
                $match:query
            },
            {
                $sort:sort
            },
            {
                $skip:skip
            },
            {
                $limit:limit
            }
        ]

        if(Object.keys(project).length) pipeline.push({$project:project})

        const results=await model.aggregate(pipeline)

        const totalDocs=await model.countDocuments(query)

        return {result:results,pageData:{total:totalDocs,pageSize:limit,skip:skip}}
    },
    updateOne:async(collection,query,setData)=>{
        try {
            const model=require(`../schema/${collection}`)
            const updateData=await model.updateOne(query,{$set:setData})

            return updateData
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=query