function(context, args) // debug:false
{
  const l = #s.scripts.lib()
  const usernames = [
    'aeryn_s',
    'bassy_thecount',
    'boris',
    'c_vader',
    'call_me_hal',
    'catness',
    'chad_bose',
    'cheechfiend91',
    'cking',
    'computer_blue',
    'd_bowman',
    'd4ft',
    'd4ria',
    'du_boyz',
    'firebreathingdragon',
    'foxy_guy',
    'frank_einstein',
    'free_man_morg',
    'geyser_soze',
    'gwashc',
    'h_jimi',
    'hand_solo',
    'huey_n',
    'i_am_the_eggman',
    'inigo',
    'ireneadler',
    'jermaine',
    'journer_of_truth',
    'juno_macguff',
    'king_in_yellow',
    'king_luther',
    'leia_it_ontheline',
    'm_ali',
    'm_c_fly',
    'madthugpug',
    'marc_garv',
    'mary_shell',
    'mjay_m_walker',
    'muld0r',
    'oz',
    'pick4rluc',
    'pickrluc',
    'purple1',
    'q_bey',
    'renaldos_malc',
    'rob_rob_taylor',
    'robo_deckard',
    'rocky_b',
    'sammy_l_jack',
    'scook',
    'seven_out_of_9',
    'shareef_j',
    'sp0ck_08',
    't3ss_of_da_uberville',
    'tam_riv',
    'terrance_cruz',
    'thadd_0s',
    'theformalartist',
    'thegreatvandross',
    'there_is_enoether',
    'tr4j4n',
    'whois_hermano',
    'wiley_curry',
    'will_de_vaughn',
    'yung_lespaul'
  ]

  // Delete existing entries from DB
  try {
    let result = #db.r({SID:'t3_usernames'})
    l.log(result)
  }
  catch (err) {
    l.log('Unable to delete records.  Error was:')
    l.log(err)
  }

  for (let u of usernames) {
    try {
      let result = #db.i({SID: 't3_usernames', username:u, checked:false})
      l.log(`Inserted ${u}`)
      l.log(result)
    }
    catch (err) {
      // User already exists
      l.log(err)
    }
  }

  return args.debug ? [
    l.get_log()
  ] : [
    'Users added successfully'
  ]
}
