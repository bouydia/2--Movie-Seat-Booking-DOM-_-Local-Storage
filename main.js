const container=document.querySelector('.container')
const seats=document.querySelectorAll('.row .seat:not(.occupid)')
const count=document.getElementById('count')
const total=document.getElementById('total')
const movieSelect=document.getElementById('movie')
let  ticketPrice=parseInt(movieSelect.value)
populateUI()

//movie data func
function setMovieData(index,price){
    localStorage.setItem('selectedMovieIndex',index)
    localStorage.setItem('selectedMoviePrice',price)
}

//update total and count 
function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount=selectedSeats.length
    
    const seatsIndex=[...selectedSeats].map(function(seat,index){
        return [...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex) )
    
    count.innerText=selectedSeatsCount
    total.innerText=selectedSeatsCount * ticketPrice
}
//populate UI
function populateUI(){
    const slectedseats=JSON.parse(localStorage.getItem('selectedSeats'))
    if(slectedseats !=null && slectedseats.length>0){
        seats.forEach((seat,index)=>{
            if(slectedseats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }
    
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex')
    const selectedMoviePrice=localStorage.getItem('selectedMoviePrice')
    
    if(selectedMovieIndex!=null){
        movieSelect.selectedIndex=selectedMovieIndex

    }
    ticketPrice=+selectedMoviePrice
    updateSelectedCount()
}    

//select movie event 
movieSelect.addEventListener('change',(e)=>{
    ticketPrice=parseInt(e.target.value)
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount()
})

//seat click event
container.addEventListener('click',(e)=>{
   if(e.target.classList.contains("seat") && !e.target.classList.contains("occupid") ){
    e.target.classList.toggle('selected')
   }
   
   updateSelectedCount()
})