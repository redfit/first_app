//<debug>
Ext.Loader.setPath({
  'Ext': 'touch/src',
  'first_app': 'app'
});
//</debug>

Ext.application({
  name: 'first_app',

  launch: function() {
    Ext.create("Ext.tab.Panel", {
      fullscreen: true, // fullscreen がないとエラーになる、なんでだろ？
      tabBarPosition: 'bottom',

      items: [
        {
          title: 'Home',
          iconCls: 'home',
          html: [
            '<img src="http://staging.sencha.com/img/sencha.png" />',
            '<h1>Welcome to Sencha Touch</h1>',
            "<p>You're creating the Getting Started app. This demonstrates how ",
            "to use tabs, lists and forms to create a simple app</p>",
            '<h2>Sencha Touch (2.0.0)</h2>'
          ].join("") // joinなくても綺麗に映る
        },
        {
          xtype: "nestedlist",
          title: "blog",
          iconCls: 'star',
          displayField: 'title',

          store: {
            type: 'tree',

            fields: [
              'title', 'link', 'anthor', 'contentSnippet', 'content', {name: 'leaf', defaultValue: true}
            ],

            root: {
              leaf: false
            },

            proxy: {
              type: 'jsonp',
              url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
              reader: {
                type: 'json',
                rootProperty: 'responseData.feed.entries'
              }
            }
          },
          detailCard: {
            xtype: 'panel',
            scrollable: true,
            styleHtmlContent: true
          },

          listeners: {
            itemtap: function(nestedList, list, index, element, post) {
              this.getDetailCard().setHtml(post.get('content'));
            }
          }
        },
        {
          title: 'Contact',
          iconCls: 'user',
          xtype: 'formpanel',
          url: 'contact.php',
          layout: 'vbox',

          items: [
            {
              xtype: 'fieldset',
              title: 'Contact Us',
              instructions: '(email address is optional)',
              items: [
                {
                  xtype: 'textfield',
                  label: 'Name'
                },
                {
                  xtype: 'emailfield',
                  label: 'Email'
                },
                {
                  xtype: 'textfield',
                  label: 'Message'
                }
              ]
            },
            {
              xtype: 'button',
              text: 'Send',
              ui: 'confirm',
              handler: function() {
                this.up('formpanel').submit();
              }
            }
          ]
        }
      ]
    });
  }
});
