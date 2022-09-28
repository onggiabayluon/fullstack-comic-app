function objToArray(objects) {
  const resultArray = Object.keys(objects).map((index) => {
    let err = objects[index]
    return err
  })
  return resultArray
}

export default objToArray
