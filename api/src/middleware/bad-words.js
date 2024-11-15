import { Filter } from "bad-words";

const createFilter = () => {
    const filter = new Filter();
    filter.addWords(
        'burro', 'idiota', 'imbecil', 'otário', 'babaca', 'palhaço', 'mané', 'vacilão', 'verme', 'lixo',
        'canalha', 'cretino', 'nojento', 'trouxa', 'vagabundo', 'safado', 'ridículo', 'cafajeste', 'porco',
        'incompetente', 'inútil', 'miserável', 'ignorante', 'moleque', 'peste', 'traidor', 'delinquente',
        'desgraçado', 'maldito', 'safado', 'filha da mãe', 'corno', 'vadia', 'prostituta', 'vagabunda',
        'merda', 'bosta', 'escroto', 'fedido', 'cuzão', 'boçal', 'escória', 'fracassado', 'racista',
        'preconceituoso', 'machista', 'homofóbico', 'xenofóbico', 'pedófilo', 'retardado', 'anta',
        'patético', 'brocha', 'fedorento', 'satanás', 'demônio', 'canalha', 'cretina', 'prostituto',
        'boqueteiro', 'viado', 'lésbica', 'bicha', 'baitola', 'animal', 'fuleira', 'paspalho', 'imundo',
        'galinha', 'piranha', 'rameira', 'ordinária', 'trambiqueiro', 'embuste', 'marica', 'pau no cu',
        'puta', 'foda-se', 'chupa meu', 'imoral', 'desgraça', 'cretino', 'burra', 'inútil', 'porra', 'bosta', 'patife', 'cachorro', 'vagabundo',
        'prostituição', 'covarde', 'lazarento', 'infeliz', 'corno manso', 'canalhice', 'vacilo', 'vaca', 'rapariga',
        'bocó', 'frouxo', 'cego', 'piriguete', 'gigolô', 'ladrão', 'vigarista', 'sem vergonha', 'maldito', 'peste',
        'fedido', 'embusteiro', 'vagal', 'bandido', 'peste negra', 'cara de pau', 'bagaceira', 'pau mandado',
        'fuleiro', 'arrombado', 'tranqueira', 'escroto', 'patife', 'moleque de rua', 'ratazana', 'desocupado',
        'desprovido', 'tonto', 'doente', 'maníaco', 'pancada', 'barrigudo', 'desalmado', 'abusado', 'fanático',
        'tapado', 'zé ruela', 'capacho', 'desonesto', 'salafrário', 'parasita', 'insolente', 'marginal', 'bandido',
        'impostor', 'careca', 'sujo', 'vadio', 'boca suja', 'pedinte', 'esfarrapado', 'destrambelhado', 'verme',
        'ladrãozinho', 'sacana', 'pinel', 'covardão', 'esquizofrênico', 'doidivanas', 'idiota completo', 'fuleiro',
        'boca mole', 'manézão', 'otarão', 'imprestável', 'fracassadinho', 'capeta',
        'puta', 'cu', 'cú', 'vaca', 'foda', 'b***', 'm***', 'arrombado', 'cuzão', 'fdp', 'vai se f***', 'puta que pariu',
        'filho da puta', 'c***lho', 'buceta', 'cu', 'pau no cu', 'vai tomar no cu', 'caralho', 'desgraça', 'porra',
        'vai se ferrar', 'vadia', 'vaca', 'piranha', 'rapariga', 'prostituta', 'fuder', 'puta', 'boquete', 'chupar',
        'enfiar', 'comer', 'arrombada', 'cuzao', 'caralhuda', 'corno', 'otário', 'escroto', 'bosta', 'merda', 'fezes',
        'nojento', 'fodido', 'viado', 'baitola', 'traveco', 'travesti', 'boiol*', 'maric*', 'viadão', 'veado',
        'filha da p***', 'filha da m***', 'bucet*', 'bund*', 'cuzinho', 'cagalhão', 'chupa meu pau', 'toma no cu',
        'enfia no c***', 'vai te f***', 'boqueteiro', 'pauzão', 'rola', 'pinto', 'pau pequeno', 'tarado', 'f***-se',
        'danado', 'porcalhão', 'mocréia', 'quenga', 'prostituto', 'galinha', 'gigolô', 'mamador', 'gozador', 'babaca',
        'babacão', 'chupador', 'xoxota', 'grelo', 'tetas', 'mamar', 'peitão', 'mijão', 'cagão', 'mijona', 'cagona',
        'bunda mole', 'zé buceta'
    );
    return filter;
}
export default createFilter;



