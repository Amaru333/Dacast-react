import * as React from 'react';
import styled, { css } from 'styled-components';


export const DragAndDrop = (props: {hasError: boolean, handleDrop: Function} & React.HTMLAttributes<HTMLDivElement>) => {

    let dropRef= React.useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = React.useState<boolean>(false)


    const handleDrag = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }
    const handleDragOut = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false);
    }
    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false);
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
        }
    }

    React.useEffect(() => {
        if(dropRef.current !== null) {
            dropRef.current.addEventListener('dragenter', handleDragIn)
            dropRef.current.addEventListener('dragleave', handleDragOut)
            dropRef.current.addEventListener('dragover', handleDrag)
            dropRef.current.addEventListener('drop', handleDrop)
    
            return () => {
                dropRef.current!.removeEventListener('dragenter', handleDragIn)
                dropRef.current!.removeEventListener('dragleave', handleDragOut)
                dropRef.current!.removeEventListener('dragover', handleDrag)
                dropRef.current!.removeEventListener('drop', handleDrop)
            }
        }
        return;

    }, [])

    return (
        <DnDContainer hasError={props.hasError} ref={dropRef}>
            {isDragging &&
          <div 
              style={{
                  border: 'dashed grey 4px',
                  backgroundColor: 'rgba(255,255,255,.8)',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0, 
                  right: 0,
                  zIndex: 9999
              }}
          >
              <div 
                  style={{
                      position: 'absolute',
                      top: '50%',
                      right: 0,
                      left: 0,
                      textAlign: 'center',
                      color: 'grey',
                      fontSize: 36
                  }}
              >
                  <div>drop here :)</div>
              </div>
          </div>
            }
            {props.children}
        </DnDContainer>
    )
}

const DnDContainer = styled.div<{hasError: boolean}>`
    width: 49%;
    position: relative;
    height: 96px;
    border: 1px dashed ${props => props.theme.colors['gray-7']};
    ${props => props.hasError && css `
        border: 1px dashed ${props.theme.colors['red']};
    `}
`