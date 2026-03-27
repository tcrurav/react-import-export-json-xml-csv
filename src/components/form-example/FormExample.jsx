function FormExample(props) {

  return (
    <div>
        <h1>Form Example</h1>
        <form onSubmit={props.addLocation}>
            <label htmlFor="location-name">Location name:</label>
            <input type="text" id="location-name" name="location-name" placeholder="location name"/>
            <label htmlFor="surface">Surface:</label>
            <input type="number" id="location-surface" name="location-surface" placeholder="location surface"/>

            <input type="submit" />
        </form>
    </div>          
  )
}

export default FormExample