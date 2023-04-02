const { defineAbility } = require("@casl/ability");
const acl = (user, resource, action, body, opts, relation) => {

  return defineAbility((can, cannot) => {

    if (user.role === 'admin') {
      can('manage', 'all');
      return;
    }

    switch (resource.constructor.name) {

      case 'User':
        can('manage', 'User', {id: user.id});
        break;

      case 'Product':
        can('read', 'Product');

      case 'Cart':
        can('manage', 'Cart', {userId: user.id});
        break;

      case 'Order':
        can('manage', 'Order', {userId: user.id});
        break;

      case 'Supply':
        //can('manage', 'Supply');
        break;
    }
  });
};

module.exports = acl;
