import Form from "../src/classes/Form"

const title = "testName"
const id = "testID"
const desc = "testDescription"
const sections: any[] = []

const form = new Form(title, desc, id, sections)

const simpleBuild = {
    "title": title,
    "formID": id,
    "desc": desc,
    "sections": sections
}

test('Test Form getID', () => {
    expect(form.getID()).toEqual(id);
});

test('Test Form getJson', () => {
    expect(form.getJson()).toEqual(simpleBuild);
});

test('Test build form', () => {
    const newForm = Form.build(simpleBuild)
    expect(newForm).toBeInstanceOf(Form)
    expect(newForm.getJson()).toEqual(simpleBuild);
});


