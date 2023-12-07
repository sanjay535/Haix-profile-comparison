import React from 'react';
import { Tabs, Tab } from './Tabs';

const Insight = () => {
  return (
    <div>
      <Tabs>
        <Tab label="User-Account Insights">
          <div className="py-4">
            
          </div>
        </Tab>
        <Tab label="Hashtag Insight">
          <div className="py-4">
            <h2 className="text-lg font-medium mb-2">Tab 2 Content</h2>
            
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Insight;