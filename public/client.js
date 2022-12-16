const form=document.getElementById('formdata');
const input=document.getElementById('inputfile');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('pdfs', files[i]);
    }
    console.log(formData);
    try {
        const {data}=await axios.post('/merge',formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        if(data.message==="success"){
          input.value="";
          window.location.href = `http://localhost:3000/static/${data.data}.pdf`;
        }
    } catch (error) {
        console.log(error);
    }
})