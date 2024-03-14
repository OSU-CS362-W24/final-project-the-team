/**
 * @jest-environment jsdom
 */


const fs = require("fs")
const domTesting = require('@testing-library/dom')
const { userInfo } = require("os")
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default


function initDomFromFIles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function(){
        require(jsPath)
    })
    
}

test("Clicking the + button adds an X and Y input correctly", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
	
	// Acquire the + button
	const addCoordInputBtn = domTesting.getByText(document, "+")

    //Acquire X and Y values
    const XVal = domTesting.getByLabelText(document, "X")
    const YVal = domTesting.getByLabelText(document, "Y")
    
	// Act:
	const user = userEvent.setup()
    
    await user.type(XVal, "5")
    await user.type(YVal, "10")
	await user.click(addCoordInputBtn)

	// Assert:
    CheckXInputs = domTesting.queryAllByText(document,"X")
    CheckYInputs = domTesting.queryAllByText(document,"Y")

	// Checks that 2 new inputs are added
    expect(CheckXInputs).toHaveLength(2)
    expect(CheckYInputs).toHaveLength(2)
    expect(XVal).toHaveValue(5)
    expect(YVal).toHaveValue(10)
})

test("Generating a chart without supplying axis labels", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
	
	// Acquire the + button
	const addCoordInputBtn = domTesting.getByText(document, "+")

    //Acquire X and Y values
    const XVal = domTesting.getByLabelText(document, "X")
    const YVal = domTesting.getByLabelText(document, "Y")
    
	// Act:
	const user = userEvent.setup()
    
    await user.type(XVal, "5")
    await user.type(YVal, "10")
	await user.click(addCoordInputBtn)

	// Assert:
    CheckXInputs = domTesting.queryAllByText(document,"X")
    CheckYInputs = domTesting.queryAllByText(document,"Y")

	// Checks that 2 new inputs are added
    expect(CheckXInputs).toHaveLength(2)
    expect(CheckYInputs).toHaveLength(2)
    expect(XVal).toHaveValue(5)
    expect(YVal).toHaveValue(10)
})
/*
test("Generating a chart without supplying axis labels", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
	
	// Acquire the + button
	const addCoordInputBtn = domTesting.getByText(document, "+")

    //Acquire X and Y values
    const XVal = domTesting.getByLabelText(document, "X")
    const YVal = domTesting.getByLabelText(document, "Y")
    
	// Act:
	const user = userEvent.setup()
    
    await user.type(XVal, "5")
    await user.type(YVal, "10")
	await user.click(addCoordInputBtn)

	// Assert:
    CheckXInputs = domTesting.queryAllByText(document,"X")
    CheckYInputs = domTesting.queryAllByText(document,"Y")

	// Checks that 2 new inputs are added
    expect(CheckXInputs).toHaveLength(2)
    expect(CheckYInputs).toHaveLength(2)
    expect(XVal).toHaveValue(5)
    expect(YVal).toHaveValue(10)
})
*/

    