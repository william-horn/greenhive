
const modalTypes = {


    newPostPrompt: {
        header: 'Create Post',
        hasCancel: true,
        hasSubmit: true,
        content: [
            {
                label: 'Enter post title:',
                input: 'text'
            },
            {
                label: 'Enter post body:',
                input: 'textarea'
            },
        ]
    },


}

module.exports = modalTypes;
