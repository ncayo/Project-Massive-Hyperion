import React from 'react'
import html2canvas from 'html2canvas'
import { WhatsappLogo } from '@phosphor-icons/react'

export default function Editor({ tshirt, elStage, tshirtOnChange, setSelected, selected, setModal }) {
    const [fileUpload, setFileUpload] = React.useState({});
    const [dlImage, setDLimage] = React.useState(false)

    function changeColor(color) {
        tshirtOnChange({
            ...tshirt,
            color: color
        })
    }

    function chnageDirection(e) {
        tshirtOnChange({
            ...tshirt,
            direction: e.target.value
        })
    }

    function _designLabel(val, direction) {
        let setVal = val
        let dl_front = document.getElementById("dl_front")
        let dl_back = document.getElementById("dl_back")
        if (setVal === null) {
            if (direction === 'front') {
                setVal = "Front Design"
            } else {
                setVal = "Back Design"
            }
        }

        if (direction === 'front') {
            dl_front.innerHTML = setVal
        } else {
            dl_back.innerHTML = setVal
        }
    }

    function changeDesign(e) {
        const file = e.target.files[0]
        console.log(file.name)
        const input_name = e.target.name
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg']

        // check is file an image
        if (file && acceptedImageTypes.includes(file['type'])) {
            const design = URL.createObjectURL(file)
            // set label image
            _designLabel(file.name, input_name)

            // Get image width
            let img = new Image();
            img.src = design
            img.onload = function () {
                // console.log(canvas_width)
                // console.log(this.width + " " + this.height);
                setFileUpload({
                    stream: design,
                    direction: input_name,
                    width: this.width,
                    height: this.height
                })
            };
        } else {
            // console.log('anajay bukan gambar')
            setModal({
                isOpen: true,
                message: 'Please upload an image file (jpg, jpeg, png)'
            })
            e.target.value = null
        }
    }

    React.useEffect(() => {
        function _calculate_image_size(type, originalWidth, originalHeight) {
            const canvas = Math.round(40 * elStage.current.clientWidth / 100)

            if (originalWidth >= canvas) {
                const maxWidth = canvas
                const maxHeight = Math.round(55 * elStage.current.clientWidth / 100)
                var ratio = 0;  // Used for aspect ratio
                var width = originalWidth;    // Current image width
                var height = originalHeight;  // Current image height

                let newWidth = maxWidth;
                let newHeight = maxWidth;

                if (width > maxWidth && width > height) {
                    ratio = width / height;
                    newHeight = maxWidth / ratio;
                    newWidth = maxWidth

                } else if (height > maxHeight && height > width) {
                    ratio = height / width;
                    newWidth = maxHeight / ratio
                    newHeight = maxHeight;
                }

                if (type === 'width') {
                    return newWidth
                } else {
                    return newHeight
                }
            }
            return originalWidth
        }

        if (Object.keys(fileUpload).length > 0) {
            tshirtOnChange({
                ...tshirt,
                designs: {
                    ...tshirt.designs,
                    [fileUpload.direction]: {
                        ...tshirt.designs[fileUpload.direction],
                        preview: fileUpload.stream,
                        positions: {
                            ...tshirt.designs[fileUpload.direction].positions,
                            width: _calculate_image_size('width', fileUpload.width, fileUpload.width),
                            height: _calculate_image_size('height', fileUpload.width, fileUpload.height)
                        }
                    }
                }
            })

            setFileUpload({})
        }
    }, [fileUpload, tshirt, tshirtOnChange, elStage])

    const downloadURI = (uri, name) => {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    React.useEffect(() => {
        if (dlImage && !selected) {
            saveImage()
            setDLimage(false)
        }

        function saveImage() {
            let element = document.getElementById("myDesign")
            const windowW = window.innerWidth
            if (windowW < 1024) {
                element.style.position = "fixed"
                element.style.zIndex = 999
                element.style.left = 0
            }

            html2canvas(element, {
                allowTaint: true,
                removeContainer: false,
                backgroundColor: null
            }).then(canvas => {
                if (windowW < 1024) {
                    element.style.position = null
                    element.style.zIndex = null
                    element.style.left = null
                }
                downloadURI(canvas.toDataURL('image/png'), 'tes')
                // document.body.appendChild(canvas);
            })
        }

    }, [dlImage, setDLimage, selected])

    // React.useEffect(() => {
    //     console.log('editor loaded')
    // }, [])

    return (
        <div onClick={() => setSelected(false)} className="w-full py-10 lg:py-0 min-h-0 lg:min-h-screen flex items-center justify-center">
            <div className="w-full px-5 lg:px-10">
                <h1 className="mb-2 text-xl font-mons lg:text-2xl font-bold text-gray-800">Cotton Combed 30s (Lengan Pendek)</h1>
                <div className="mb-2">
                    <label className="tracking-wide text-gray-600 text-xs font-mons font-medium mb-2">
                        By Visual Store
                    </label>
                    <div className=' mt-8 mb-5 flex space-x-2'>
                    <button onClick={()=>changeColor('black')} className="border bg-black flex w-5 h-5 border-solid border-black hover:border-blue-600"></button>
                    <button onClick={()=>changeColor('whites')} className="border bg-white flex w-5 h-5 border-solid border-black hover:border-blue-600"></button>
                    <button onClick={()=>changeColor('red')} className="border bg-[#C5271A] flex w-5 h-5 border-solid border-black hover:border-blue-600"></button>
                    <button onClick={()=>changeColor('yellow')} className="border bg-[#E9C243] flex w-5 h-5 border-solid border-black hover:border-blue-600"></button>
                  </div>
                </div>
                <div className="mb-5">
                    <label className="font-mons text-gray-700 text-sm font-bold mb-2">
                    Bagian
                </label>
                    <div className="relative">
                        <select onChange={chnageDirection} className="appearance-none font-mons w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="direction">
                            <option className="font-mons" value="front">Depan</option>
                            <option className="font-mons" value="back">Belakang</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <label className="font-mons text-gray-700 text-sm font-bold mb-2">
                        Upload Gambar
                </label>
                    <label className="w-full block cursor-pointer mb-3 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" htmlFor="d_front">
                        <span className="truncate block" id="dl_front">Depan</span>
                        <input id="d_front" onChange={changeDesign} className="w-full hidden" type="file" name="front" />
                    </label>
                    <label className="w-full block cursor-pointer mb-3 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" htmlFor="d_back">
                        <span className="truncate block" id="dl_back">Belakang</span>
                        <input id="d_back" onChange={changeDesign} className="w-full hidden" type="file" name="back" />
                    </label>
                </div>
                <div className='flex justify-center'>
                    <button className="bg-red-600 font-mons font-semibold rounded-md text-white px-4 py-2 outline-none  " onClick={() => setDLimage(true)}>Save Image</button>
                </div>
                <a href="https://wa.me/6281348502626" className=' rounded-md flex justify-center pt-4'>
                    <button className=' flex justify-center items-center py-2 px-4 bg-[#4BAB66] rounded-md'>
                      <WhatsappLogo size="32px" color='#ffffff' />
                      <p className=' font-mons font-bold text-sm text-white'>Chat Sekarang (WhatsApp)</p>
                    </button>
                  </a>
            </div>
        </div>
    )
}