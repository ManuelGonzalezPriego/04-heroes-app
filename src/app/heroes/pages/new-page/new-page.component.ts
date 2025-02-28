import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {
  public heroForm=new FormGroup({
    id:new FormControl<string>('',{nonNullable:true}),
    superhero:new FormControl<string>(''),
    publisher:new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:new FormControl(''),
    first_appearance:new FormControl('') ,
    characters:new FormControl('') ,
    alt_img:new FormControl('')
  });

  public publishers=[
    {"id": "DC Comics","desc": "DC - Comics"},
    {"id": "Marvel Comics","desc": "Marvel - Comics"}
  ]

  // Creamos hero que es un objeto Hero y lo seteamos como null por defacto
  public hero:Hero=null!;

  // Importamos tato heroes service como route
  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    //* Proporciona información sobre una operación con un mensaje de una sola línea, que puede incluir una acción.
    //* El mensaje de Snackbar aparece por encima de todos los demás elementos y se coloca en la parte inferior central de la pantalla.
    private snackBar:MatSnackBar,

    //* Antes de realizar la eliminación de un héroe, es interesante lanzar un diálogo de confirmación de eliminación.
    //* Para ello vamos a utilizar Material Dialog
    private dialog:MatDialog
  ){}

  // Esto nos pasa la info de heroForm a la interfaz Hero y si esta bien nos lo creará
  get currentHero():Hero{
    return this.heroForm.value as Hero;
  }

  //Cuando le demos a submint vera si el hero form es valido si no saldremos con return
  onSubmit():void{
    if(this.heroForm.invalid) return;

    //Si nuestro hero en el form tiene id significa que estamos en edicion entronces lo actualizaremos
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero=>{
        this.showSnackBar(`${this.hero.superhero} is updated!`)
      });
      return
    }

    //Si no es nada de lo anterior es crar un heroe, entoces usaremos add hero
    this.heroesService.addHero(this.currentHero)
      .subscribe(hero=>{
        // TODO: Mostrar snackbar y navegar a /hero/edit/hero.id
        this.showSnackBar(`${this.hero.superhero} is created!`)

      });
  }

  // Cuando la pagian se inici comprobamos su la ruta contiene editar, si lo contiene siguimos si no usamos return
  ngOnInit():void{
    if(!this.router.url.includes('edit')) return;

    //Spliteamos la url para obtener el ide que es el ultimo parametro de la url
    const urlSplit:string[]=this.router.url.split('/');

    // Haremos uso de getHeroById usando el split dela url para sacar la id y nos subscribiremos a la consulta
    // ademas de indicar que lo que recivimos lo vamos a llamar hero
    this.heroesService.getHeroById(urlSplit[urlSplit.length-1]).subscribe(hero=>{

      // Angular mola mucho y como mola al poner ! delante del objeto heroe comprueva si es valido
      if(!hero){
        // Si no es correcto retornamos a la raiz ya que como tenemos hecho un redireccionamiento en el route
        // Es mas comodo poner solo / que /hero/list
        this.router.navigate(['/']);
        return;
      }

      // Si es correcto nuestro hero lo igualamos al hero de la consulta
      this.hero=hero;

      // Con reset seteamos los valores
      this.heroForm.reset({
        // Con los ... recorremos todas las propiedades de hero y las ponemos directamente,como nos enseño
        // nuestro compañero Jaime
        ... this.hero
      });
    });
  }

  //* Este metodo privado mostrará la información de el SnackBar, en este caso el boton de confirmación de lectura sera un ok y durara 2500 milisegundos
  private showSnackBar(message:string):void{
    // El mensage de la snackbar es el mensage pasado por parametro y el boton para confirmar es el que le indicamos despues de la coma
    this.snackBar.open(message, 'ok',{
      duration:2500,
    })
  }

  //* Haciendo uso de este metodo eliminaremos el heroe y mostraremos el dialogo pertinente
  public onDeleteHero(){
    if(!this.currentHero.id) throw Error("Hero id is required...");

    // Para esto tendremos que crear un conponente con ng g c heroes/components/confirmDialog --inline-style --skip-tests
    // Y ahora sí que podemos llamar a nuestro ConfirmDialogComponent:
    const dialogRef=this.dialog.open(ConfirmDialogComponent, {
      data:this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('Deleted');
    });
  }
}
