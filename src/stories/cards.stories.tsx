import React from 'react';
import { storiesOf } from '@storybook/react'
import { Card } from '../components/Card/Card';
import { Text } from '../components/Typography/Text'

storiesOf('Cards', module)
    .add('Cards', () => ( 
        <React.Fragment>
            <Card>
              <Text size={14} weight="med">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum accusamus placeat pariatur ducimus ea eius aliquam corrupti laudantium officia. Laborum laboriosam, consequatur facilis rerum sunt eius dignissimos praesentium. Mollitia, facere?</Text>
            </Card>
    
        </React.Fragment>

    ))